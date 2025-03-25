import fs from 'fs';
import path from 'path';
import { Project } from 'ts-morph';
import chalk from 'chalk';

// Define the API prefix (adjust this as needed)
const API_PREFIX = '/api/v1';

// Function to crawl the project directory and find all controller files
function getControllerFiles(directory) {
  const files = [];
  const walkDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        walkDirectory(fullPath); // Recurse into subdirectories
      } else if (fullPath.endsWith('.controller.js') || fullPath.endsWith('.controller.ts')) {
        files.push(fullPath); // Only add `.controller.ts` files
      }
    });
  };
  walkDirectory(directory);
  return files;
}

// Function to extract routes from a controller file
function extractRoutesFromController(controllerFile) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(controllerFile);

  const routes = [];

  // Traverse the methods in the controller and look for route decorators
  const classes = sourceFile.getClasses();
  classes.forEach(classDeclaration => {
    const className = classDeclaration.getName();

    // Extract the controller's route prefix (if it exists)
    const classDecorators = classDeclaration.getDecorators();
    let classPrefix = '';
    classDecorators.forEach(decorator => {
      if (decorator.getName() === 'Controller') {
        const argumentsText = decorator.getArguments().map(arg => arg.getText()).join(' ');
        // If the controller has a route prefix (like @Controller('users')), extract it
        if (argumentsText) {
          classPrefix = argumentsText;
        }
      }
    });

    classDeclaration.getMethods().forEach(method => {
      const methodName = method.getName();

      // Look for route decorators (like @Get, @Post, etc.)
      const decorators = method.getDecorators();
      decorators.forEach(decorator => {
        const decoratorName = decorator.getName();
        if (['Get', 'Post', 'Put', 'Delete', 'Patch'].includes(decoratorName)) {
          // Extract the route path from the decorator
          const routePath = decorator.getArguments().map(arg => arg.getText()).join(' ');

          // Combine the controller prefix and the method route
          const fullRoute = [API_PREFIX, classPrefix.replace(/^['"]|['"]$/g, ''), routePath.replace(/^['"]|['"]$/g, '')].join("/");

          // Add to the routes list
          routes.push({
            type: decoratorName.toUpperCase(),
            route: fullRoute,
            controller: `${className}@${methodName}`
          });
        }
      });
    });
  });

  return routes;
}

// Function to display the routes in a table-like structure with color-coded HTTP methods
function printRoutesTable(routes) {
  console.table(routes);
  // const methodColors = {
  //   Get: chalk.green,
  //   Post: chalk.blue,
  //   Put: chalk.yellow,
  //   Delete: chalk.red,
  //   Patch: chalk.magenta,
  // };

  // console.log(chalk.bold('API Routes:'));
  // console.log(chalk.bold('----------------------------------------------------------'));
  // console.log(
  //   'Method'.padEnd(15) +
  //   'Endpoint'.padEnd(35) +
  //   'Controller Class'.padEnd(30) +
  //   'Method'
  // );
  // console.log(chalk.gray('----------------------------------------------------------'));

  // routes.forEach(route => {
  //   const coloredMethod = methodColors[route.type] ? methodColors[route.type](route.type) : route.type;
  //   console.log(
  //     coloredMethod.padEnd(15) +
  //     route.route.padEnd(35) +
  //     route.controller.padEnd(30) +
  //     route.method
  //   );
  // });
  // console.log(chalk.gray('----------------------------------------------------------'));
}

// Main function to list all routes in the project
function listApiRoutes() {
  const controllersDir = './src'; // Adjust this to your project source directory
  const controllerFiles = getControllerFiles(controllersDir);

  const allRoutes = [];

  controllerFiles.forEach(file => {
    const routes = extractRoutesFromController(file);
    allRoutes.push(...routes);
  });

  // Display the routes in a nice table
  printRoutesTable(allRoutes);
}

// Run the script
listApiRoutes();
