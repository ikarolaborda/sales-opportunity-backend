import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const userType = sequelize.define(
    'userType',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
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

  userType.associate = (models) => {
    models.userType.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });


    
    models.userType.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.userType.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.userType.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return userType;
}
