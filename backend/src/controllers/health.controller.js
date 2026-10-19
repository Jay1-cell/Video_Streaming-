/**
 * CourseHub — Health Controller
 */

export class HealthController {
  static getHealth(req, res) {
    res.status(200).json({
      status: 'ok',
      service: 'coursehub-backend',
      version: '1.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      cloudArchitectureTarget: 'AWS (DynamoDB, S3, MediaConvert, EventBridge, CloudFront)',
    });
  }
}
