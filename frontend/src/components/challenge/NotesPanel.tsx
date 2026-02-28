
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NotesPanelProps {
    challengeId: string;
}

const NotesPanel = ({ challengeId }: NotesPanelProps) => {
    const [note, setNote] = useState('');

    useEffect(() => {
        const savedNote = localStorage.getItem(`note-${challengeId}`);
        if (savedNote) {
            setNote(savedNote);
        } else {
            setNote('');
        }
    }, [challengeId]);

    const handleSave = () => {
        localStorage.setItem(`note-${challengeId}`, note);
        toast.success('Notes saved successfully!');
    };

    return (
        <div className="flex flex-col h-full bg-card">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
                <h3 className="font-semibold text-foreground">My Notes</h3>
                <Button size="sm" variant="outline" onClick={handleSave} className="gap-2 h-8">
                    <Save className="h-4 w-4" />
                    Save
                </Button>
            </div>
            <div className="flex-1 p-4">
                <textarea
                    className="w-full h-full p-4 bg-muted/30 border border-border/50 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm font-mono leading-relaxed"
                    placeholder="Write your observations, algorithms, or key learnings here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
        </div>
    );
};

export default NotesPanel;
