import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      adminEmail: "anurajthakur141@gmail.com",
      adminPassword: "Average@123!admin"
    }
  }
});
