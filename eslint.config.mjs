import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore patterns first
  {
    ignores: [
      "**/generated/**",
      "src/generated/**",
      "**/prisma/generated/**",
      "**/node_modules/**",
      ".next/**", 
      "out/**",
      "dist/**",
      "**/*.generated.*",
      "**/edge.js",
      "**/runtime/**"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
