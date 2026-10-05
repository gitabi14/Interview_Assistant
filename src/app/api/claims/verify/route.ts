import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { claimId, answer } = await request.json();

    return NextResponse.json({
      success: true,
      claimId: claimId || 'claim-1',
      demonstratedLevel: 'Intermediate',
      evidenceConfidence: 62,
      evidenceStatus: 'Partial',
      findings: {
        pros: [
          'Understands single-stage YOLO architecture',
          'Accurately cites real-time latency target (sub-50ms)',
        ],
        gaps: [
          'Missing explanation of ONNX Runtime quantization',
          'Vague description of GPU memory contention across 4 camera feeds',
        ],
      },
      interviewerRisk: 'HIGH',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
