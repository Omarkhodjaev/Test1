const { boolean } = require("joi");
const { ResData } = require("../../library/resData");
const { VariantBadRequestException } = require("./exception/variant.exception");

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
}

module.exports = { VariantController };
