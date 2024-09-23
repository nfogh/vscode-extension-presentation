import { bigint, z } from 'zod';

const schema = z.object({
    build_tools: z.object({
        git: z.string(),
        compile_commands: z.string(),
        root: z.string(),
        compiler: z.string(),
        linker: z.string(),
        debugger: z.string()
    }),
    packages: z.record(
        z.string(),
        z.object({
            url: z.string(),
            root: z.string(),
            compile_commands: z.string(),
            libs: z.array(z.string()),
            ldpaths: z.array(z.string()),
            include: z.array(z.string())
        })
    ),
    cflags: z.string(),
    ldflags: z.string(),
    binaries: z.record(
        z.string(),
        z.object({
            type: z.string(),
            sources: z.array(z.string()),
            dependencies: z.array(z.string()).optional(),
            name: z.string().optional(),
            include: z.array(z.string()).optional(),
            dest: z.string()
        })
    )
});

export interface BinaryConfig {
    type: string;
    dest: string;
    name: string;
    dependencies: string[];
    sources: string[];
    include: string[];
}

export interface TerribuildConfig {
    packages: string[];
    binaries: Map<string, BinaryConfig>;
}

export async function parseTerribuildJson(data: string): Promise<TerribuildConfig> {
    const jsonData = JSON.parse(data);

    const parsed = schema.safeParse(jsonData);
    if (!parsed.success) {
        throw new Error("Invalid terribuild.json: " + parsed.error.errors);
    }

    let packages: string[] = [];
    if (parsed.data.packages) {
        for (const pkg in parsed.data.packages) {
            packages.push(pkg);
        }
    }

    let binaries = new Map<string, BinaryConfig>();
    if (parsed.data.binaries) {
        for (const bin in parsed.data.binaries) {
            const data = parsed.data.binaries[bin];
            if (data) {
                binaries.set(bin, {
                    type: data.type,
                    dest: data.dest,
                    name: data.name ?? bin,
                    sources: data.sources,
                    include: data.include ?? [],
                    dependencies: data.dependencies ?? []
                });
            }
        }
    }

    return { packages, binaries };
}
