# Flash Web Crawler

A powerful and flexible web crawler that allows you to create automated web scraping workflows using structured action formats. Built with TypeScript and integrated with proxy and captcha solving capabilities.

## Features

- **Structured Action Format**: Define web crawling sequences using typed actions
- **Captcha Handling**: Integrated captcha solving capabilities
- **Proxy Support**: Built-in integration with Bright Data for reliable proxy services
- **Type Safety**: Fully typed actions for better development experience
- **Docker Support**: Containerized deployment ready

## Action Types

The crawler supports various action types to handle different web automation scenarios:

```typescript
type BotActionClass = 'captcha' | 'debug' | 'default';

type BotActionCaptchaType = 'wait' | 'solve' | 'disableAutoSolve';

type BotActionDebugType = 'screenshot' | 'url';

type BotActionType =
  | 'form'
  | 'click'
  | 'delay'
  | 'goto'
  | 'input'
  | 'download'
  | BotActionCaptchaType
  | BotActionDebugType;

type BotAction = {
  type: BotActionType;
  cat?: BotActionClass;
  selector?: string;
  value?: string;
  timeout?: number;
  validationURL?: string;
};
```

## Setup
1. Clone the repository
2. Install dependencies:
3. Create a .env file in the root directory with your Bright Data credentials:
## Building and Running
1. Build the project:
2. Build the Docker image:
3. Run the container:
## Usage
Send a POST request to the crawler with an array of actions. Example:

## Action Classes
- default : Basic web automation actions
- captcha : Captcha-related operations
- debug : Debugging and monitoring actions
## Supported Actions
- goto : Navigate to a URL
- click : Click on an element
- input : Enter text into a field
- form : Submit a form
- delay : Wait for a specified duration
- download : Download a file
- solve : Solve a captcha
- wait : Wait for a captcha
- disableAutoSolve : Disable automatic captcha solving
- screenshot : Take a screenshot
- url : Get current URL
## Requirements
- Node.js
- Docker
- Bright Data account
## License
MIT

```plaintext

This README provides a comprehensive overview of your project, including setup instructions, usage examples, and supported features. It maintains a professional tone while being informative and easy to follow.
```