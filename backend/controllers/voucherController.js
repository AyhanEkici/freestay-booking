const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class VoucherController {
  constructor(pool) {
    this.pool = pool;
  }

  async getUserVouchers(req, res) {
    try {
      const userId = req.user.id;
      
      const result = await this.pool.query(`
        SELECT * FROM vouchers 
        WHERE purchased_by_user = $1
        ORDER BY created_at DESC
      `, [userId]);

      res.json({ vouchers: result.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async purchaseVoucher(req, res) {
    try {
      const { amount } = req.body;
      const userId = req.user.id;

      // Generate unique voucher code
      const code = this.generateVoucherCode();
      const validityStart = new Date();
      const validityEnd = moment(validityStart).add(365, 'days').toDate(); // 1 year

      const result = await this.pool.query(`
        INSERT INTO vouchers (code, price, validity_start, validity_end, purchased_by_user)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `, [code, amount, validityStart, validityEnd, userId]);

      res.json({
        success: true,
        voucher: result.rows[0]
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async validateVoucher(req, res) {
    try {
      const { code } = req.params;

      const result = await this.pool.query(`
        SELECT * FROM vouchers 
        WHERE code = $1 
        AND status = 'active'
        AND validity_start <= CURRENT_TIMESTAMP
        AND validity_end >= CURRENT_TIMESTAMP
      `, [code.toUpperCase()]);

      if (result.rows.length === 0) {
        return res.json({
          valid: false,
          error: 'Invalid or expired voucher'
        });
      }

      const voucher = result.rows[0];
      res.json({
        valid: true,
        voucher: {
          id: voucher.id,
          code: voucher.code,
          price: voucher.price
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  generateVoucherCode() {
    const prefix = 'VCH';
    const randomPart = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();
    return `${prefix}${randomPart}`;
  }
}

// Export with pool dependency
module.exports = new VoucherController(require('../server').pool);
