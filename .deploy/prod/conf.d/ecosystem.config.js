module.exports = {
  apps: [
    {
      name: 'contractis',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      cwd: '/app',
      script: 'app/node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
