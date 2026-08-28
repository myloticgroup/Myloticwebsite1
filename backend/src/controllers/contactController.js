import { ContactService } from '../services/contactService.js';
import { validateContactLead } from '../validators/contactValidator.js';

export class ContactController {
  static async submitContact(req, res, next) {
    try {
      const result = validateContactLead(req.body);

      if (!result.ok) {
        return res.status(400).json({
          success: false,
          message: 'Please review the form fields and try again.',
          errors: result.errors,
        });
      }

      const lead = await ContactService.createContactLead(result.sanitized, {
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you. Your inquiry has been received by Mylotic technical leadership.',
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
