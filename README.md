# mpc-utils

## User Guide

---

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

---

## Installation

### Local Usage
1. Clone the repository or download the source code.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the project:
   ```sh
   npm run build
   ```

### Global CLI Usage
To use mpc-utils as a command-line tool globally:
1. Run:
   ```sh
   npm link
   ```
   This will make the `mpc-utils` command available globally on your system.

---

## Usage Modes

### 1. Interactive Mode
**Description:**
- Launches a guided prompt to help you split or recombine secrets interactively.

**How to use:**
- If installed globally:
  ```sh
  mpc-utils
  ```
- If running locally (not installed globally):
  ```sh
  npm run start
  ```

### 2. Command-Line (CLI) Mode
**Description:**
- Allows you to run specific commands with flags for automation or scripting.

**How to use:**
- If installed globally:
  ```sh
  mpc-utils split --secret "mysecret" --shares 5 --threshold 3
  mpc-utils recombine --shares "share_1" "share_2" "share_3"
  ```
- If running locally (not installed globally):
  ```sh
  npm run start -- split --secret "mysecret" --shares 5 --threshold 3
  npm run start -- recombine --shares "share_1" "share_2" "share_3"
  ```

**Show help and available options:**
- Globally:
  ```sh
  mpc-utils --help
  mpc-utils split --help
  mpc-utils recombine --help
  ```
- Locally:
  ```sh
  npm run start -- --help
  npm run start -- split --help
  npm run start -- recombine --help
  ```

---

## Output Type

Both `split` and `recombine` commands support the `--outputType` flag to control how results are returned:

- `json`: Outputs the result as JSON to the console (default).
- `file`: Saves the result to a file. You can specify the output base path with the optional `--fileBasePath` flag. 
          If not set, it defaults to the current directory. If the base path does not exists it will be created.

### Example Usage

**Split a secret and get JSON output (default):**
```sh
  mpc-utils split --secret "mysecret" --shares 5 --threshold 3 --outputType json
  ```

**Split a secret and save output to a file:**
```sh
  mpc-utils split --secret "mysecret" --shares 5 --threshold 3 --outputType file --fileBasePath "shares/mysecret_shares"
  ```

**Recombine shares and get JSON output:**
```sh
  mpc-utils recombine --shares "share_1" "share_2" "share_3" --outputType json
  ```

**Recombine shares and save output to a file:**
```sh
  mpc-utils recombine --shares "share_1" "share_2" "share_3" --outputType file --fileBasePath "recombines/mysecret_recombined"
  ```

---

## Notes
- The CLI is available globally only after running `npm link` in the project directory.
- For more details on command options, use the `--help` flag.
- You can always use the interactive mode by running the tool with no arguments.
- The `--outputType` flag lets you choose between console JSON output and saving results to a file (with `--outputFile`).
