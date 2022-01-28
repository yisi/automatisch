import { GraphQLList, GraphQLNonNull } from 'graphql';
import App from '../../models/app';
import RequestWithCurrentUser from '../../types/express/request-with-current-user';
import connectionType from '../types/connection';
import availableAppsEnumType from '../types/available-apps-enum-type';

type Params = {
  key: string;
};

const getAppConnectionsResolver = async (
  params: Params,
  req: RequestWithCurrentUser
) => {
  const app = App.findOneByKey(params.key);

  const connections = await req.currentUser.$relatedQuery('connections').where({
    key: params.key,
  });

  return connections.map((connection) => ({
    ...connection,
    app,
  }));
};

const getAppConnections = {
  type: GraphQLList(connectionType),
  args: {
    key: { type: GraphQLNonNull(availableAppsEnumType) },
  },
  resolve: (_: any, params: Params, req: RequestWithCurrentUser) =>
    getAppConnectionsResolver(params, req),
};

export default getAppConnections;
