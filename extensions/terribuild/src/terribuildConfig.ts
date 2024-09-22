export interface TerribuildConfig {
    packages: string[];
    binaries: string[];
}

export async function parseTerribuildJson(data: string): Promise<TerribuildConfig> {
    const jsonData = JSON.parse(data);

    let packages: string[] = [];
    if (jsonData.packages) {
        for (const pkg in jsonData.packages) {
            packages.push(pkg);
        }
    }

    let binaries: string[] = [];
    if (jsonData.binaries) {
        for (const bin in jsonData.binaries) {
            binaries.push(bin);
        }
    }

    return { packages, binaries };
}
