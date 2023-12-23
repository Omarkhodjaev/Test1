const { ResData } = require("../../library/resData");
const { VariantBadRequestException, VariantIdMustBeNumberException } = require("./exception/variant.exception");
const { variantScheme , idSchema} = require("./validation/variant.validation");

class VariantController {
  #variantService;
  constructor(variantService) {
    this.#variantService = variantService;
  }

  async create(req, res) {
    try {
      const dto = req.body;

      dto.is_correct = dto.is_correct.toString();

      if (
        !dto ||
        !dto.title ||
        !dto.description ||
        !dto.question_id ||
        !dto.is_correct
      ) {
        throw new VariantBadRequestException();
      }

      dto.is_correct = !!dto.is_correct;

      const resData = await this.#variantService.create(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req, res) {
    const resData = await this.#variantService.getAll();
    res.status(resData.statusCode).json(resData);
  }

  async update(req, res) {
    try {
      const dto = req.body;

      const { error, value } = idSchema.validate(Number(req.params.id));
      const validated = variantScheme.validate(dto);
      if (error) {
        throw new VariantIdMustBeNumberException(error.message);
      }
      if (validated.error) {
        throw new VariantBadRequestException(validated.error.message);
      }

      const resData = await this.#variantService.update(value, dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { VariantController };
