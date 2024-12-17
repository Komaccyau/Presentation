// global.d.ts

interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition; // Safariなどのブラウザ用
}

interface SpeechRecognition {
    new (): SpeechRecognition;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionError) => void;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly alternatives: SpeechRecognitionAlternative[];
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionError {
    error: string;
    message: string;
}
