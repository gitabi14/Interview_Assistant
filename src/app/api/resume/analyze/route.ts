import { NextResponse } from 'next/server';
import { INITIAL_CLAIMS, INITIAL_PROJECTS } from '@/data/demoData';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      candidate: {
        name: 'Kabilan K A',
        degree: 'B.Tech in Computer Science & Engineering',
        education: 'Anna University / CEG',
        graduationYear: '2026',
      },
      metrics: {
        resumeFitScore: 82,
        claimCredibilityScore: 71,
        skillsCount: 14,
        projectsCount: 3,
      },
      claims: INITIAL_CLAIMS,
      projects: INITIAL_PROJECTS,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
