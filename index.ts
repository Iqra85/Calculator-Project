import * as inquirer from "inquirer";
import chalk from "chalk";

// Calculator operators
enum operators {
  ADD = "Addition",
  SUBTRACT = "Subtraction",
  MULTIPLY = "Multiplication",
  DIVIDE = "Division",
}

const prompt = inquirer.createPromptModule();

function validateNumber(input: string): boolean | string {
  if (isNaN(parseFloat(input))) {
    return "Please enter a valid number";
  }
  return true;
}

async function main() {
    const userInput = await prompt([
      {
        type: "input",
        name: "num1",
        message: "Please enter the first number:",
        validate: validateNumber,
      },
      {
        type: "input",
        name: "num2",
        message: "Please enter the second number:",
        validate: validateNumber,
      },
      {
        type: "list",
        name: "operator",
        message: "Select an operation:",
        choices: Object.values(operators),
      },
    ]);
  
    const num1 = parseFloat(userInput.num1);
    const num2 = parseFloat(userInput.num2);
    const selectedOperator = userInput.operator;
  
    let result: number;
  
    switch (selectedOperator) {
      case operators.ADD:
        result = num1 + num2;
        break;
      case operators.SUBTRACT:
        result = num1 - num2;
        break;
      case operators.MULTIPLY:
        result = num1 * num2;
        break;
      case operators.DIVIDE:
        if (num2 === 0) {
          console.log(chalk.red("Error: Division by zero is not allowed."));
          return;
        }
        result = num1 / num2;
        break;
      default:
        console.log(chalk.red("Invalid operator selected."));
        return;
    }
  
    console.log(chalk.green(`Result: ${result}`));
  }
  
  main();

