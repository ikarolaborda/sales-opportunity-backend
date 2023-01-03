import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const salesOpportunities = sequelize.define(
    'salesOpportunities',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  salesOpportunities.associate = (models) => {
    models.salesOpportunities.belongsTo(models.user, {
      as: 'sellerId',
      constraints: false,
    });

    models.salesOpportunities.belongsToMany(models.product, {
      as: 'productId',
      constraints: false,
      through: 'salesOpportunitiesProductIdProduct',
    });

    models.salesOpportunities.belongsTo(models.user, {
      as: 'clientId',
      constraints: false,
    });


    
    models.salesOpportunities.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.salesOpportunities.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.salesOpportunities.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return salesOpportunities;
}
