import ProcesModel from '../models/Process.mjs';

class ProcessRepository {
  // eslint-disable-next-line class-methods-use-this
  async save(process) {
    const newProcess = new ProcesModel();
    newProcess.filters = process.filters;
    await newProcess.save();
    return newProcess;
  }
}

export default ProcessRepository;
