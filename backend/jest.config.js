/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "./build/coverage",
    coverageProvider: "v8",
    collectCoverageFrom: ["src/**/*.{ts,js}"],
    coverageReporters: ["cobertura", "lcov", "text"],
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "./build/tests",
                outputName: "junit.xml",
                classNameTemplate: "{classname}",
                titleTemplate: "{title}",
                suiteNameTemplate: "{filename}",
                ancestorSeparator: " > "
            }
        ]
    ]
};
