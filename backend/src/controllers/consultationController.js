import { ConsultationService } from '../services/consultationService.js';
import { validateConsultationLead } from '../validators/consultationValidator.js';

export class ConsultationController {
  static async submitConsultation(req, res, next) {
    try {
      const result = validateConsultationLead(req.body);

      if (!result.ok) {
        return res.status(400).json({
          success: false,
          message: 'Please review the consultation details and try again.',
          errors: result.errors,
        });
      }

      const lead = await ConsultationService.createConsultationLead(result.sanitized, {
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      });

      return res.status(201).json({
        success: true,
        message: 'Consultation request booked successfully.',
        lead: {
          id: lead.id,
          fullName: lead.fullName,
          requirement: lead.requirement,
          status: lead.status,
          submittedAt: lead.submittedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
