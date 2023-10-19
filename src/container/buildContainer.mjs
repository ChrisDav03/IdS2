import ProcessRepository from '../repositories/ProcessRepository.mjs';
import MinioService from '../services/MinioService.mjs';
import ProcessServices from '../services/ProcessServices.mjs';

const buildContainer = (req, _res, next) => {
  const container = {};

  const processRepository = new ProcessRepository();
  const minioService = new MinioService();

  const processService = new ProcessServices({ processRepository, minioService });

  container.processService = processService;

  req.container = container;
  // Para el midelware
  return next();
};

export default buildContainer;
