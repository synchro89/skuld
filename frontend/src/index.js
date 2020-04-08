import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import "webpack-icons-installer";

import './index.html';
import './index.scss';
import './scripts/script';

import "./app";

OfflinePluginRuntime.install();
