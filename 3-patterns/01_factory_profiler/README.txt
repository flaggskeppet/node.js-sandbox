This example shows how to use the factory encapsulation to build a module
that exports different objects given the current NODE_ENV setting.

To run the example you have to run:

  # development mode (with profiler)
  export NODE_ENV=development; node profilerTest (Linux)
  $env:NODE_ENV="development"; node profilerTest (Windows powershell)

  # production mode (no profiler)
  export NODE_ENV=production; node profilerTest  (Linux)
  $env:NODE_ENV="development"; node profilerTest (Windows powershell)

