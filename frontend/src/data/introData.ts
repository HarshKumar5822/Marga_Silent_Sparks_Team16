
export interface IntroStep {
    character: 'Captain Bit' | 'Nova' | 'Robo-9000';
    avatarUrl?: string; // Optional URL if we use external images
    text: string;
    mediaUrl?: string; // Optional image/gif to show
    position?: 'left' | 'right' | 'center';
    emojis?: string[];
}

export const introData: Record<string, IntroStep[]> = {
    'linked-list-intro': [
        {
            character: 'Captain Bit',
            text: "Welcome, Explorer! Ready to chart the Introduction to Linked Lists?",
            position: 'center',
            emojis: ['👨‍🚀', '🚀', '⭐']
        },
        {
            character: 'Nova',
            text: "In this sector, DATA aligns like Planets...",
            position: 'left',
            emojis: ['🪐', '🌍', '🌑']
        },
        {
            character: 'Robo-9000',
            text: "...and POINTERS act as gravity beams linking them together!",
            position: 'right',
            emojis: ['🔗', '⚡', '🛰️']
        },
        {
            character: 'Captain Bit',
            text: "Write your code captain, and let's build a galaxy!",
            position: 'center',
            emojis: ['✨', '🌌', '🌠']
        }
    ],
    'bubble-sort-intro': [
        {
            character: 'Captain Bit',
            text: "Attention! The planetary alignment is all wrong!",
            position: 'center',
            emojis: ['⚠️', '🔭', '❌']
        },
        {
            character: 'Robo-9000',
            text: "Scanning... Mass distribution density is uneven.",
            position: 'right',
            emojis: ['📊', '🤖', '📉']
        },
        {
            character: 'Nova',
            text: "We need to sort them by mass using Bubble Sort!",
            position: 'left',
            emojis: ['🫧', '⚖️', '🔄']
        },
        {
            character: 'Captain Bit',
            text: "Heavier planets should drift to the right. Let's get sorting!",
            position: 'center',
            emojis: ['➡️', '🏋️', '✅']
        }
    ],
    // Default fallback
    'default': [
        {
            character: 'Captain Bit',
            text: "Welcome to Marga! Ready to start your mission?",
            position: 'center'
        },
        {
            character: 'Nova',
            text: "Complete the challenges to earn XP and level up.",
            position: 'left'
        },
        {
            character: 'Captain Bit',
            text: "Good luck, Explorer!",
            position: 'center'
        }
    ]
};
