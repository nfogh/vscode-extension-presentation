#include <gtest/gtest.h>
#include <hello_world/hello_world.h>
#include <sstream>

TEST(HelloWorld, ShallReturnZero)
{
    std::stringstream ss;
    EXPECT_EQ(0, PrintHelloWorld(ss));
}

TEST(HelloWorld, ShallPrintHelloWorld)
{
    std::stringstream ss;
    PrintHelloWorld(ss);
    EXPECT_EQ("Hello World\n", ss.str());
}