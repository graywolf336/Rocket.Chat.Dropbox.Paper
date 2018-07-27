import { App } from '@rocket.chat/apps-ts-definition/App';

import { IConfigurationExtend, IEnvironmentRead, } from '@rocket.chat/apps-ts-definition/accessors';
import { ISetting, SettingType } from '@rocket.chat/apps-ts-definition/settings';

import { DropboxPaperCreateCommand } from './commands/DropboxPaperCreateCommand';
import { DropboxCredentials } from './DropboxCredentials';

import { SettingToHttpHeader } from './handlers/SettingToHttpHeader';

export class DropboxPaperApp extends App {
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        configuration.settings.provideSetting({
            id: 'Dropbox_Paper_Api_Token',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Dropbox_Paper_Api_Token',
            i18nDescription: 'Dropbox_Paper_Api_Token_Description',
        });

        configuration.http.providePreRequestHandler(new SettingToHttpHeader( 'Dropbox_Paper_Api_Token', 'Authorization'));
        configuration.http.provideDefaultHeader('Content-Type', 'application/octet-stream');

        await configuration.slashCommands.provideSlashCommand(new DropboxPaperCreateCommand(this));
    }
}
