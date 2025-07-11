import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { TestModule } from './test/test.module';
import { Auth0Module } from './auth0/auth0.module';
import { AddressesModule } from './addresses/addresses.module';
import { AttendanceRecordsModule } from './attendance-records/attendance-records.module';
import { BuildingsModule } from './buildings/buildings.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { ClassSchedulesModule } from './class-schedules/class-schedules.module';
import { CoordinatorsModule } from './coordinators/coordinators.module';
import { CoursesModule } from './courses/courses.module';
import { DailyAttendancesModule } from './daily-attendances/daily-attendances.module';
import { ExternalInstructorsModule } from './external-instructors/external-instructors.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { PrincipalsModule } from './principals/principals.module';
import { StudentsModule } from './students/students.module';
import * as Joi from 'joi';

interface EnvironmentConfig {
  PORT: number;
  MONGODB_URI: string;
  NODE_ENV: 'development' | 'production' | 'test';
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        AUTH0_DOMAIN: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
      }).unknown(true), // Allow unknown environment variables
      validate: (config: Record<string, any>): EnvironmentConfig => {
        const validationResult = Joi.object({
          PORT: Joi.number().default(3000),
          MONGODB_URI: Joi.string().required(),
          NODE_ENV: Joi.string()
            .valid('development', 'production', 'test')
            .default('development'),
          AUTH0_DOMAIN: Joi.string().required(),
          AUTH0_AUDIENCE: Joi.string().required(),
        }).unknown(true).validate(config, { abortEarly: false });

        if (validationResult.error) {
          throw new Error(
            `Config validation error: ${validationResult.error.details.map((d) => d.message).join(', ')}`
          );
        }

        const validatedConfig = validationResult.value as EnvironmentConfig;

        // Log the validated config (safely)
        const { AUTH0_DOMAIN, AUTH0_AUDIENCE, MONGODB_URI } = validatedConfig;
        console.log('📝 Validated Auth0 configuration:', {
          domain: AUTH0_DOMAIN ? '✅ Set' : '❌ Hey Developer, you forgot to set the AUTH0_DOMAIN in the .env file',
          audience: AUTH0_AUDIENCE ? '✅ Set' : '❌ Hey Developer, you forgot to set the AUTH0_AUDIENCE in the .env file',
          expectedIssuer: AUTH0_DOMAIN ? '✅ Set' : '❌ Hey Developer, you forgot to set the AUTH0_DOMAIN in the .env file',
          mongodbUri: MONGODB_URI ? `✅ Set: ${MONGODB_URI}` : '❌ Hey Developer, you forgot to set the MONGODB_URI in the .env file',
        });

        return validatedConfig;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    Auth0Module,
    UserModule,
    HealthModule,
    TestModule,
    AddressesModule,
    AttendanceRecordsModule,
    BuildingsModule,
    ClassroomsModule,
    ClassSchedulesModule,
    CoordinatorsModule,
    CoursesModule,
    DailyAttendancesModule,
    ExternalInstructorsModule,
    InstitutionsModule,
    PrincipalsModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
