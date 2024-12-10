import { db } from './schema';
import { DatabaseError } from '../utils/errors';
import { EducationalCenter } from '../types/centers';

export const centersDb = {
  findAll: () => {
    try {
      const stmt = db.prepare(`
        SELECT * FROM educational_centers 
        ORDER BY name ASC
      `);
      return stmt.all() as EducationalCenter[];
    } catch (error) {
      throw new DatabaseError('Error fetching centers');
    }
  },

  create: (center: Omit<EducationalCenter, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO educational_centers (id, code, center_type, name, island, province, email, phone, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const centerId = `center-${Date.now()}`;
      
      stmt.run(
        centerId,
        center.code,
        center.center_type,
        center.name,
        center.island,
        center.province,
        center.email,
        center.phone,
        center.created_by
      );

      return { ...center, id: centerId };
    } catch (error) {
      throw new DatabaseError('Error creating center');
    }
  },

  update: (id: string, center: Partial<EducationalCenter>) => {
    try {
      const fields = Object.keys(center)
        .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
        .map(key => `${key} = ?`)
        .join(', ');

      const stmt = db.prepare(`
        UPDATE educational_centers 
        SET ${fields}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);

      const values = [...Object.values(center), id];
      stmt.run(...values);

      return true;
    } catch (error) {
      throw new DatabaseError('Error updating center');
    }
  },

  delete: (id: string) => {
    try {
      const stmt = db.prepare('DELETE FROM educational_centers WHERE id = ?');
      stmt.run(id);
      return true;
    } catch (error) {
      throw new DatabaseError('Error deleting center');
    }
  }
};