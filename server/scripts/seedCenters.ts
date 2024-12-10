import { db } from '../db/schema';

const centers = [
  {
    id: 'center-1',
    code: '35009383',
    name: 'IES Pérez Galdós',
    center_type: 'Público',
    island: 'Gran Canaria',
    province: 'Las Palmas',
    email: 'secretaria@iesperezgaldos.com',
    phone: '928361244',
    created_by: 'admin-1'
  },
  {
    id: 'center-2',
    code: '38002806',
    name: 'IES La Laboral',
    center_type: 'Público',
    island: 'Tenerife',
    province: 'Santa Cruz de Tenerife',
    email: 'secretaria@ieslalaboral.org',
    phone: '922229147',
    created_by: 'admin-1'
  },
  {
    id: 'center-3',
    code: '35007842',
    name: 'IES Santa María de Guía',
    center_type: 'Público',
    island: 'Gran Canaria',
    province: 'Las Palmas',
    email: 'secretaria@iessantamariadeguia.org',
    phone: '928882745',
    created_by: 'admin-1'
  },
  {
    id: 'center-4',
    code: '38011996',
    name: 'IES La Orotava',
    center_type: 'Público',
    island: 'Tenerife',
    province: 'Santa Cruz de Tenerife',
    email: 'secretaria@ieslarotava.org',
    phone: '922323456',
    created_by: 'admin-1'
  },
  {
    id: 'center-5',
    code: '35009814',
    name: 'IES Felo Monzón Grau-Bassas',
    center_type: 'Público',
    island: 'Gran Canaria',
    province: 'Las Palmas',
    email: 'secretaria@iesfelomonzon.org',
    phone: '928254030',
    created_by: 'admin-1'
  }
];

try {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO educational_centers (
      id, code, center_type, name, island, province, email, phone, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const center of centers) {
    stmt.run(
      center.id,
      center.code,
      center.center_type,
      center.name,
      center.island,
      center.province,
      center.email,
      center.phone,
      center.created_by
    );
  }

  console.log('✅ Sample centers added successfully');
} catch (error) {
  console.error('❌ Error adding sample centers:', error);
  process.exit(1);
}