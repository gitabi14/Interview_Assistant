import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { questionId, answerText } = await request.json();

    return NextResponse.json({
      success: true,
      extractedClaims: ['YOLOv8', 'Vehicle Detection', 'Real-Time Inference', 'Model Selection'],
      detectedConcepts: ['Single-stage vs Two-stage', 'RPN Latency', 'FPS SLA'],
      evaluation: {
        assessment: 'Partially demonstrated advanced knowledge with specific latency benchmarking gaps.',
        completenessScore: 68,
        technicalAccuracy: 72,
        depthDemonstrated: 4,
        missingPoints: [
          'Did not benchmark multi-camera PCIe data bus overhead',
          'Missing ONNX Runtime FP16 vs INT8 quantization details',
        ],
        strengths: [
          'Accurate contrast between single-stage YOLO and Faster R-CNN RPN latency',
          'Strong command over real-time edge hardware requirements',
        ],
        interviewerRisk: 'HIGH',
        frankFeedback:
          'Your answer is technically incomplete. While you clearly distinguish single-stage from two-stage architectures, you must quantify latency and explain how multi-stream GPU concurrency was handled.',
      },
      predictedFollowUps: [
        {
          question: 'What specific trade-offs did you consider when selecting YOLOv8 for real-time inference, and how did you measure latency under multi-stream load?',
          depthLevel: 4,
          probability: 0.94,
        },
      ],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
