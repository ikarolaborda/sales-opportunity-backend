import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import SalesOpportunitiesRepository from '../database/repositories/salesOpportunitiesRepository';
import ProductRepository from '../database/repositories/productRepository';
import UserRepository from '../database/repositories/userRepository';

export default class SalesOpportunitiesService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.sellerId = await UserRepository.filterIdInTenant(data.sellerId, { ...this.options, transaction });
      data.productId = await ProductRepository.filterIdsInTenant(data.productId, { ...this.options, transaction });
      data.clientId = await UserRepository.filterIdInTenant(data.clientId, { ...this.options, transaction });

      const record = await SalesOpportunitiesRepository.create(data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'salesOpportunities',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.sellerId = await UserRepository.filterIdInTenant(data.sellerId, { ...this.options, transaction });
      data.productId = await ProductRepository.filterIdsInTenant(data.productId, { ...this.options, transaction });
      data.clientId = await UserRepository.filterIdInTenant(data.clientId, { ...this.options, transaction });

      const record = await SalesOpportunitiesRepository.update(
        id,
        data,
        {
          ...this.options,
          transaction,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'salesOpportunities',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await SalesOpportunitiesRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id) {
    return SalesOpportunitiesRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return SalesOpportunitiesRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return SalesOpportunitiesRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await SalesOpportunitiesRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
