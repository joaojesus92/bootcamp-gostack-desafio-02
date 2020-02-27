import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipients = await Recipients.findOne({
      where: { nome: req.body.nome },
    });

    if (recipients) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const { id, nome, cep } = await Recipients.create(req.body);

    return res.json({
      id,
      nome,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipients = await Recipients.findOne({
      where: { nome: req.body.nome },
    });

    if (recipients) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }
    const selector = {
      where: { id: req.query.index },
    };

    try {
      await Recipients.update(req.body, selector);
      return res.json({ message: 'Update successfully' });
    } catch (err) {
      return res.status(401).json({ error: 'Update error' });
    }
  }
}

export default new RecipientsController();
