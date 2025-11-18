// Piston is a code execution engine that allows running code in various programming languages.
const PISTOM_API_URL = "https://emkc.org/api/v2/piston";

const LANGUAGE_CONFIG = {
  python: {
    version: "3.9.1",
    language: "python3",
  },
  javascript: {
    version: "14.15.4",
    language: "javascript",
  },
  java: {
    version: "15.0.1",
    language: "java",
  },
};

const EXTENSIONS = {
  python: "py",
  javascript: "js",
  java: "java",
};

/**
 * Executes code in the specified programming language using the Piston API.
 *
 * @param {string} language - The programming language to execute the code in.
 * @param {string} code - The code to be executed.
 * @returns {Promise<{success: boolean, output: string?, error: string?}>} - A promise that resolves to the execution result.
 */
export const executeCode = async (language, code) => {
  try {
    const languageConfig = LANGUAGE_CONFIG[language];
    if (!languageConfig) {
      return { success: false, error: `Unsupported language - ${language}` };
    }

    const response = await fetch(`${PISTOM_API_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error - status ${response.status}`,
      };
    }

    const body = await response.json();
    const output = body.run.output || "";
    const stderror = body.run.stderror || "";

    if (stderror) {
      return {
        success: false,
        output: output,
        error: stderror,
      };
    }
    return {
      success: true,
      output: output,
    };
  } catch (error) {
    return { success: false, error: `Error executing code - ${error.message}` };
  }
};

const getFileExtension = (language) => {
  return EXTENSIONS[language] || "text";
};
