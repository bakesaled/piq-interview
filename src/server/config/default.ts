import { ConnectionOptions } from 'mongoose';

export class DefaultConfig {
  public static port: any = process.env.ATH_API_PORT || 7000;
  public static database: string = process.env.CT_API_DATABASE ||
    'mongodb://testuser:1234@ds249428.mlab.com:49428/athenaeum';
  public static dbOptions: ConnectionOptions = {
    keepAlive: 300000,
    connectTimeoutMS: 30000
  };
}
