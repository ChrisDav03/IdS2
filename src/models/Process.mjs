import { Schema, model } from 'mongoose';
import { TYPE_OF_FILTERS } from '../commons/constans.mjs';

const ProcessSchema = new Schema(
  {
    filters: {
      type: [
        {
          type: String,
          enum: TYPE_OF_FILTERS,
          required: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const ProcesModel = model('process', ProcessSchema);

export default ProcesModel;
