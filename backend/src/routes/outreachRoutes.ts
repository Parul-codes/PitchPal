import { Router } from 'express';
import OutreachRecord, { IOutreachRecord } from '../models/outreachRecords';

const router = Router();

// Get all records
router.get('/', async (req, res) => {
  try {
    const records = await OutreachRecord.find().sort({ dmSentDate: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Add new record
router.post('/', async (req, res) => {
  try {
    const newRecord = new OutreachRecord(req.body as IOutreachRecord);
    const saved = await newRecord.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error saving record', error: err });
  }
});

// Update record
router.put('/:id', async (req, res) => {
  try {
    const updated = await OutreachRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating record', error: err });
  }
});

// Delete record
router.delete('/:id', async (req, res) => {
  try {
    await OutreachRecord.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting record', error: err });
  }
});

export default router;
