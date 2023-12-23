const { ResData } = require("../../library/resData.js");
const path = require("path");
const { DataSource } = require("../../library/dataSource.js");
const { generationId } = require("../../library/generationId.js");
const Variant = require("./entity/variant.entity.js");
const { questionIdNotfound } = require("./exception/variant.exception.js");

class VariantService {
  async create(dto) {
    const variantPath = path.join(
      __dirname,
      "../../../database",
      "variants.json"
    );
    const variantsDataSource = new DataSource(variantPath);
    const variants = variantsDataSource.read();

    const generatedId = generationId(variants);

    let question = this.#findQuestionId(dto);

    if (!question) {
      throw new questionIdNotfound();
    }

    const newVariant = new Variant(
      generatedId,
      dto.title,
      dto.description,
      dto.question_id,
      dto.is_correct
    );

    variants.push(newVariant);
    variantsDataSource.write(variants);

    const resData = new ResData("Variant Successfully created ", 201, {
      variant: newVariant,
    });

    return resData;
  }

  async getAll() {
    const variantPath = path.join(
      __dirname,
      "../../../database",
      "variants.json"
    );
    const variantsDataSource = new DataSource(variantPath);
    const variants = variantsDataSource.read();

    const resData = new ResData("All variants are taken", 200, variants);
    return resData;
  }

  async update(id, dto) {    
    const variantPath = path.join(
      __dirname,
      "../../../database",
      "variants.json"
    );

    const variantsDataSource = new DataSource(variantPath);
    const variants = variantsDataSource.read();

    let newVariant = variants.find((variant) => variant.id === id);
    
    
      newVariant.title = dto.title,
      newVariant.description = dto.description,
      newVariant.question_id =  dto.questionId,
      newVariant.is_correct = dto.isCorrect
      
      
      const filteredVariant = variants.filter(variant => variant.id !== id);
      filteredVariant.push(newVariant);
    variantsDataSource.write(filteredVariant)

    const resData = new ResData("Variant updated", 200, newVariant);
    return resData;

  }

  #findQuestionId(dto) {
    const questionPath = path.join(
      __dirname,
      "../../../database",
      "questions.json"
    );

    const questionDataSource = new DataSource(questionPath);
    const questions = questionDataSource.read();

    const foundQuestion = questions.find((question) => {
      return dto.question_id === question.id;
    });

    return !!foundQuestion;
  }
}

module.exports = VariantService;
