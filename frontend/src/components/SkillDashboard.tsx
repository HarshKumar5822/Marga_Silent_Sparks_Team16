import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';

interface SkillDashboardProps {
    skills: { [key: string]: { level: string; score: number; confidence: number } };
}

export const SkillDashboard: React.FC<SkillDashboardProps> = ({ skills }) => {
    // Transform skills map to array for Recharts
    const data = Object.keys(skills).map(skillName => ({
        subject: skillName,
        A: skills[skillName].score,
        fullMark: 100,
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Radar Chart for Skill Balance */}
            <Card>
                <CardHeader>
                    <CardTitle>Skill Profile</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="My Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Linear Progress Bars for specific stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Mastery Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(skills).map(([name, data]) => (
                        <div key={name}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">{name}</span>
                                <span className="text-sm text-gray-500">{data.level} ({data.score}%)</span>
                            </div>
                            <Progress value={data.score} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">AI Confidence: {data.confidence}%</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};
