import { TalentService } from '../services/talentService.js';
import { validateTalentLead } from '../validators/talentValidator.js';

export class TalentController {
  static async submitTalentProfile(req, res, next) {
    try {
      const result = validateTalentLead(req.body);

      if (!result.ok) {
        return res.status(400).json({
          success: false,
          message: 'Please review your talent profile details and try again.',
          errors: result.errors,
        });
      }

      const lead = await TalentService.createTalentLead(result.sanitized, {
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you. Your profile has been added to the Mylotic specialized talent network.',
        lead: {
          id: lead.id,
          fullName: lead.fullName,
          status: lead.status,
          submittedAt: lead.submittedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
