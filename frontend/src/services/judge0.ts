import api from '@/utils/api';

export const LANGUAGE_IDS: Record<string, string> = {
    c: 'c',
    cpp: 'cpp',
    java: 'java',
    python: 'python',
    javascript: 'javascript',
};

export interface ExecutionResult {
    stdout: string | null;
    time: string | null;
    memory: number | null;
    stderr: string | null;
    compile_output: string | null;
    message: string | null;
    status: {
        id: number;
        description: string;
    };
}

export const submitCode = async (sourceCode: string, languageId: string | number, expectedInput: string = ''): Promise<ExecutionResult> => {
    try {
        // Reverse lookup language name if ID is somehow passed
        let language = languageId;
        if (typeof languageId === 'number') {
            const mapped = Object.keys(LANGUAGE_IDS).find(key => LANGUAGE_IDS[key] === languageId.toString());
            language = mapped || 'python';
        }

        const response = await api.post('/challenges/run', {
            code: sourceCode,
            language: language,
            expectedInput: expectedInput
        });

        const data = response.data;

        return {
            stdout: data.output || (data.passed ? 'Execution successful.' : null),
            time: data.time?.toString() || '0.0',
            memory: data.memory || 0,
            stderr: data.passed ? null : data.output,
            compile_output: null,
            message: data.message || null,
            status: data.status || {
                id: data.passed ? 3 : 11,
                description: data.passed ? 'Accepted' : 'Runtime Error'
            }
        };
    } catch (error: any) {
        console.error("Error submitting code to local executor:", error);
        return {
            stdout: null,
            time: '0.0',
            memory: 0,
            stderr: error.response?.data?.message || error.message || "Failed to execute",
            compile_output: null,
            message: error.message,
            status: {
                id: 11,
                description: 'Runtime Error'
            }
        };
    }
};
