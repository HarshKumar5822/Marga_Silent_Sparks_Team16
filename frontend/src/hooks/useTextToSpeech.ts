import { useState, useEffect, useCallback } from 'react';

interface SpeechState {
    isSpeaking: boolean;
    isSupported: boolean;
    voices: SpeechSynthesisVoice[];
}

export const useTextToSpeech = () => {
    const [state, setState] = useState<SpeechState>({
        isSpeaking: false,
        isSupported: 'speechSynthesis' in window,
        voices: [],
    });

    useEffect(() => {
        if (!state.isSupported) return;

        const updateVoices = () => {
            setState(prev => ({
                ...prev,
                voices: window.speechSynthesis.getVoices(),
            }));
        };

        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;

        return () => {
            window.speechSynthesis.cancel();
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [state.isSupported]);

    const speak = useCallback((text: string, langCode: string = 'en-US') => {
        if (!state.isSupported) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Attempt to find a voice for the requested language
        // We try to match the full code (e.g. 'hi-IN') or just the prefix ('hi')
        const voice = state.voices.find(v =>
            v.lang === langCode || v.lang.startsWith(langCode.split('-')[0])
        );

        if (voice) {
            utterance.voice = voice;
        }

        utterance.lang = langCode;
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => setState(prev => ({ ...prev, isSpeaking: true }));
        utterance.onend = () => setState(prev => ({ ...prev, isSpeaking: false }));
        utterance.onerror = () => setState(prev => ({ ...prev, isSpeaking: false }));

        window.speechSynthesis.speak(utterance);
    }, [state.isSupported, state.voices]);

    const stop = useCallback(() => {
        if (state.isSupported) {
            window.speechSynthesis.cancel();
            setState(prev => ({ ...prev, isSpeaking: false }));
        }
    }, [state.isSupported]);

    return {
        ...state,
        speak,
        stop,
    };
};
