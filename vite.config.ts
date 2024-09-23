import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig(({ mode }): any => {
  return {
    root: __dirname,
    build: {
      target: "es2022",
      minify: true,
      sourcemap: false,
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/],
      },
    },
    test: {
      root: "./",
      globals: true,
      testTimeout: 600000,
      hookTimeout: 60000,
      passWithNoTests: true,
      include: ["**/*.spec.ts"],
      environment: "node",
    },
    esbuild: true,
    optimizeDeps: {
      esbuildOptions: { treeShaking: true },
      exclude: [
        "@nestjs/core",
        "@nestjs/common",
        "@nestjs/apollo",
        "@nestjs/platform-express",
        "@nestjs/microservices",
        "cache-manager",
        "class-transformer",
        "class-validator",
        "fastify-swagger",
        "@nestjs/platform-socket.io",
        "@nestjs/websockets",
        "redis",
        "ts-morph",
      ],
    },
    plugins: [
      viteCommonjs(),
      ...VitePluginNode({
        adapter: "nest",
        appPath: "./src/main.ts",
        exportName: "viteNodeApp",
        tsCompiler: "swc",
        initAppOnBoot: true, // Turn off initAppOnBoot when in test mode
      }),
    ],
  };
});
