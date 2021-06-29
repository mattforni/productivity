"use strict";

/*
 * These migrations can take one of two forms, a direct move or a general function.
 *
 * Direct move:
 *   These objects have an array of `moves`, which
 *   are objects containing an `old` setting name and a `new` setting name.
 *   Any existing config found in the `old` name will be moved over to (and overwrite)
 *   the `new` key.
 *
 * Functions:
 *   These have a `migrate` function, which takes the
 *   current linter-eslint atom config as an argument, and can act on it however
 *   it needs to.
 */
const activeMigrations = [{
  added: 'January, 2018',
  description: 'Organized config settings into sections',
  moves: [{
    old: 'disableWhenNoEslintConfig',
    new: 'disabling.disableWhenNoEslintConfig'
  }, {
    old: 'fixOnSave',
    new: 'autofix.fixOnSave'
  }, {
    old: 'ignoreFixableRulesWhileTyping',
    new: 'autofix.ignoreFixableRulesWhileTyping'
  }, {
    old: 'rulesToDisableWhileFixing',
    new: 'autofix.rulesToDisableWhileFixing'
  }, {
    old: 'rulesToSilenceWhileTyping',
    new: 'disabling.rulesToSilenceWhileTyping'
  }, {
    old: 'disableEslintIgnore',
    new: 'advanced.disableEslintIgnore'
  }, {
    old: 'disableFSCache',
    new: 'advanced.disableFSCache'
  }, {
    old: 'showRuleIdInMessage',
    new: 'advanced.showRuleIdInMessage'
  }, {
    old: 'eslintrcPath',
    new: 'global.eslintrcPath'
  }, {
    old: 'advancedLocalNodeModules',
    new: 'advanced.localNodeModules'
  }, {
    old: 'eslintRulesDirs',
    new: 'advanced.eslintRulesDirs'
  }, {
    old: 'useGlobalEslint',
    new: 'global.useGlobalEslint'
  }, {
    old: 'globalNodePath',
    new: 'global.globalNodePath'
  }]
}, {
  added: 'September, 2017',
  description: 'Deprecated eslintRulesDir{String} option in favor of eslintRulesDirs{Array<String>}',

  migrate(config) {
    const oldRulesdir = config.eslintRulesDir;

    if (oldRulesdir) {
      const newRulesDirs = config.eslintRulesDirs;

      if (newRulesDirs.length === 0) {
        atom.config.set('linter-eslint.eslintRulesDirs', [oldRulesdir]);
      }

      atom.config.unset('linter-eslint.eslintRulesDir');
    }
  }

}];
/*
 * This function can be called when linter-eslint first activates in order to
 * ensure that the user's settings are up-to-date with the current version of
 * linter-eslint.  Ideally, we would call this only when upgrading to a new
 * version.
 */

function migrateConfigOptions(migrations = activeMigrations) {
  if (migrations.length) {
    const linterEslintConfig = atom.config.get('linter-eslint');
    migrations.forEach(migration => {
      if (migration.moves && Array.isArray(migration.moves)) {
        // Copy old settings over to the new ones, then unset the old setting keys
        migration.moves.forEach(move => {
          const oldSetting = linterEslintConfig[move.old];

          if (oldSetting !== undefined) {
            atom.config.set(`linter-eslint.${move.new}`, oldSetting);
            atom.config.unset(`linter-eslint.${move.old}`);
          }
        });
      } else if (typeof migration.migrate === 'function') {
        migration.migrate(linterEslintConfig);
      }
    });
  }
}

exports.migrateConfigOptions = migrateConfigOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRlLWNvbmZpZy1vcHRpb25zLmpzIl0sIm5hbWVzIjpbImFjdGl2ZU1pZ3JhdGlvbnMiLCJhZGRlZCIsImRlc2NyaXB0aW9uIiwibW92ZXMiLCJvbGQiLCJuZXciLCJtaWdyYXRlIiwiY29uZmlnIiwib2xkUnVsZXNkaXIiLCJlc2xpbnRSdWxlc0RpciIsIm5ld1J1bGVzRGlycyIsImVzbGludFJ1bGVzRGlycyIsImxlbmd0aCIsImF0b20iLCJzZXQiLCJ1bnNldCIsIm1pZ3JhdGVDb25maWdPcHRpb25zIiwibWlncmF0aW9ucyIsImxpbnRlckVzbGludENvbmZpZyIsImdldCIsImZvckVhY2giLCJtaWdyYXRpb24iLCJBcnJheSIsImlzQXJyYXkiLCJtb3ZlIiwib2xkU2V0dGluZyIsInVuZGVmaW5lZCIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1BLGdCQUFnQixHQUFHLENBQ3ZCO0FBQ0VDLEVBQUFBLEtBQUssRUFBRSxlQURUO0FBRUVDLEVBQUFBLFdBQVcsRUFBRSx5Q0FGZjtBQUdFQyxFQUFBQSxLQUFLLEVBQUUsQ0FDTDtBQUNFQyxJQUFBQSxHQUFHLEVBQUUsMkJBRFA7QUFFRUMsSUFBQUEsR0FBRyxFQUFFO0FBRlAsR0FESyxFQUlGO0FBQ0RELElBQUFBLEdBQUcsRUFBRSxXQURKO0FBRURDLElBQUFBLEdBQUcsRUFBRTtBQUZKLEdBSkUsRUFPRjtBQUNERCxJQUFBQSxHQUFHLEVBQUUsK0JBREo7QUFFREMsSUFBQUEsR0FBRyxFQUFFO0FBRkosR0FQRSxFQVVGO0FBQ0RELElBQUFBLEdBQUcsRUFBRSwyQkFESjtBQUVEQyxJQUFBQSxHQUFHLEVBQUU7QUFGSixHQVZFLEVBYUY7QUFDREQsSUFBQUEsR0FBRyxFQUFFLDJCQURKO0FBRURDLElBQUFBLEdBQUcsRUFBRTtBQUZKLEdB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bnRlbnQiOlsiLypcbiAqIFRoZXNlIG1pZ3JhdGlvbnMgY2FuIHRha2Ugb25lIG9mIHR3byBmb3JtcywgYSBkaXJlY3QgbW92ZSBvciBhIGdlbmVyYWwgZnVuY3Rpb24uXG4gKlxuICogRGlyZWN0IG1vdmU6XG4gKiAgIFRoZXNlIG9iamVjdHMgaGF2ZSBhbiBhcnJheSBvZiBgbW92ZXNgLCB3aGljaFxuICogICBhcmUgb2JqZWN0cyBjb250YWluaW5nIGFuIGBvbGRgIHNldHRpbmcgbmFtZSBhbmQgYSBgbmV3YCBzZXR0aW5nIG5hbWUuXG4gKiAgIEFueSBleGlzdGluZyBjb25maWcgZm91bmQgaW4gdGhlIGBvbGRgIG5hbWUgd2lsbCBiZSBtb3ZlZCBvdmVyIHRvIChhbmQgb3ZlcndyaXRlKVxuICogICB0aGUgYG5ld2Aga2V5LlxuICpcbiAqIEZ1bmN0aW9uczpcbiAqICAgVGhlc2UgaGF2ZSBhIGBtaWdyYXRlYCBmdW5jdGlvbiwgd2hpY2ggdGFrZXMgdGhlXG4gKiAgIGN1cnJlbnQgbGludGVyLWVzbGludCBhdG9tIGNvbmZpZyBhcyBhbiBhcmd1bWVudCwgYW5kIGNhbiBhY3Qgb24gaXQgaG93ZXZlclxuICogICBpdCBuZWVkcyB0by5cbiAqL1xuY29uc3QgYWN0aXZlTWlncmF0aW9ucyA9IFtcbiAge1xuICAgIGFkZGVkOiAnSmFudWFyeSwgMjAxOCcsXG4gICAgZGVzY3JpcHRpb246ICdPcmdhbml6ZWQgY29uZmlnIHNldHRpbmdzIGludG8gc2VjdGlvbnMnLFxuICAgIG1vdmVzOiBbXG4gICAgICB7XG4gICAgICAgIG9sZDogJ2Rpc2FibGVXaGVuTm9Fc2xpbnRDb25maWcnLFxuICAgICAgICBuZXc6ICdkaXNhYmxpbmcuZGlzYWJsZVdoZW5Ob0VzbGludENvbmZpZycsXG4gICAgICB9LCB7XG4gICAgICAgIG9sZDogJ2ZpeE9uU2F2ZScsXG4gICAgICAgIG5ldzogJ2F1dG9maXguZml4T25TYXZlJ1xuICAgICAgfSwge1xuICAgICAgICBvbGQ6ICdpZ25vcmVGaXhhYmxlUnVsZXNXaGlsZVR5cGluZycsXG4gICAgICAgIG5ldzogJ2F1dG9maXguaWdub3JlRml4YWJsZVJ1bGVzV2hpbGVUeXBpbmcnXG4gICAgICB9LCB7XG4gICAgICAgIG9sZDogJ3J1bGVzVG9EaXNhYmxlV2hpbGVGaXhpbmcnLFxuICAgICAgICBuZXc6ICdhdXRvZml4LnJ1bGVzVG9EaXNhYmxlV2hpbGVGaXhpbmcnXG4gICAgICB9LCB7XG4gICAgICAgIG9sZDogJ3J1bGVzVG9TaWxlbmNlV2hpbGVUeXBpbmcnLFxuICAgICAgICBuZXc6ICdkaXNhYmxpbmcucnVsZXNUb1NpbGVuY2VXaGlsZVR5cGluZydcbiAgICAgIH0sIHtcbiAgICAgICAgb2xkOiAnZGlzYWJsZUVzbGludElnbm9yZScsXG4gICAgICAgIG5ldzogJ2FkdmFuY2VkLmRpc2FibGVFc2xpbnRJZ25vcmUnXG4gICAgICB9LCB7XG4gICAgICAgIG9sZDogJ2Rpc2FibGVGU0NhY2hlJyxcbiAgICAgICAgbmV3OiAnYWR2YW5jZWQuZGlzYWJsZUZTQ2FjaGUnXG4gICAgICB9LCB7XG4gICAgICAgIG9sZDogJ3Nob3dSdWxlSWRJbk1lc3NhZ2UnLFxuICAgICAgICBuZXc6ICdhZHZhbmNlZC5zaG93UnVsZUlkSW5NZXNzYWdlJ1xuICAgICAgfSwge1xuICAgICAgICBvbGQ6ICdlc2xpbnRyY1BhdGgnLFxuICAgICAgICBuZXc6ICdnbG9iYWwuZXNsaW50cmNQYXRoJ1xuICAgICAgfSwge1xuICAgICAgICBvbGQ6ICdhZHZhbmNlZExvY2FsTm9kZU1vZHVsZXMnLFxuICAgICAgICBuZXc6ICdhZHZhbmNlZC5sb2NhbE5vZGVNb2R1bGVzJ1xuICAgICAgfSwge1xuICAgICAgICBvbGQ6ICdlc2xpbnRSdWxlc0RpcnMnLFxuICAgICAgICBuZXc6ICdhZHZhbmNlZC5lc2xpbnRSdWxlc0RpcnMnXG4gICAgICB9LCB7XG4gICAgICAgIG9sZDogJ3VzZUdsb2JhbEVzbGludCcsXG4gICAgICAgIG5ldzogJ2dsb2JhbC51c2VHbG9iYWxFc2xpbnQnXG4gICAgICB9LCB7XG4gICAgICAgIG9sZDogJ2dsb2JhbE5vZGVQYXRoJyxcbiAgICAgICAgbmV3OiAnZ2xvYmFsLmdsb2JhbE5vZGVQYXRoJ1xuICAgICAgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIGFkZGVkOiAnU2VwdGVtYmVyLCAyMDE3JyxcbiAgICBkZXNjcmlwdGlvbjogJ0RlcHJlY2F0ZWQgZXNsaW50UnVsZXNEaXJ7U3RyaW5nfSBvcHRpb24gaW4gZmF2b3Igb2YgZXNsaW50UnVsZXNEaXJze0FycmF5PFN0cmluZz59JyxcbiAgICBtaWdyYXRlKGNvbmZpZykge1xuICAgICAgY29uc3Qgb2xkUnVsZXNkaXIgPSBjb25maWcuZXNsaW50UnVsZXNEaXJcbiAgICAgIGlmIChvbGRSdWxlc2Rpcikge1xuICAgICAgICBjb25zdCBuZXdSdWxlc0RpcnMgPSBjb25maWcuZXNsaW50UnVsZXNEaXJzXG4gICAgICAgIGlmIChuZXdSdWxlc0RpcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYXRvbS5jb25maWcuc2V0KCdsaW50ZXItZXNsaW50LmVzbGludFJ1bGVzRGlycycsIFtvbGRSdWxlc2Rpcl0pXG4gICAgICAgIH1cbiAgICAgICAgYXRvbS5jb25maWcudW5zZXQoJ2xpbnRlci1lc2xpbnQuZXNsaW50UnVsZXNEaXInKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXVxuXG4vKlxuICogVGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIHdoZW4gbGludGVyLWVzbGludCBmaXJzdCBhY3RpdmF0ZXMgaW4gb3JkZXIgdG9cbiAqIGVuc3VyZSB0aGF0IHRoZSB1c2VyJ3Mgc2V0dGluZ3MgYXJlIHVwLXRvLWRhdGUgd2l0aCB0aGUgY3VycmVudCB2ZXJzaW9uIG9mXG4gKiBsaW50ZXItZXNsaW50LiAgSWRlYWxseSwgd2Ugd291bGQgY2FsbCB0aGlzIG9ubHkgd2hlbiB1cGdyYWRpbmcgdG8gYSBuZXdcbiAqIHZlcnNpb24uXG4gKi9cbmZ1bmN0aW9uIG1pZ3JhdGVDb25maWdPcHRpb25zKG1pZ3JhdGlvbnMgPSBhY3RpdmVNaWdyYXRpb25zKSB7XG4gIGlmIChtaWdyYXRpb25zLmxlbmd0aCkge1xuICAgIGNvbnN0IGxpbnRlckVzbGludENvbmZpZyA9IGF0b20uY29uZmlnLmdldCgnbGludGVyLWVzbGludCcpXG4gICAgbWlncmF0aW9ucy5mb3JFYWNoKChtaWdyYXRpb24pID0+IHtcbiAgICAgIGlmIChtaWdyYXRpb24ubW92ZXMgJiYgQXJyYXkuaXNBcnJheShtaWdyYXRpb24ubW92ZXMpKSB7XG4gICAgICAgIC8vIENvcHkgb2xkIHNldHRpbmdzIG92ZXIgdG8gdGhlIG5ldyBvbmVzLCB0aGVuIHVuc2V0IHRoZSBvbGQgc2V0dGluZyBrZXlzXG4gICAgICAgIG1pZ3JhdGlvbi5tb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2xkU2V0dGluZyA9IGxpbnRlckVzbGludENvbmZpZ1ttb3ZlLm9sZF1cbiAgICAgICAgICBpZiAob2xkU2V0dGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoYGxpbnRlci1lc2xpbnQuJHttb3ZlLm5ld31gLCBvbGRTZXR0aW5nKVxuICAgICAgICAgICAgYXRvbS5jb25maWcudW5zZXQoYGxpbnRlci1lc2xpbnQuJHttb3ZlLm9sZH1gKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1pZ3JhdGlvbi5taWdyYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1pZ3JhdGlvbi5taWdyYXRlKGxpbnRlckVzbGludENvbmZpZylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydHMubWlncmF0ZUNvbmZpZ09wdGlvbnMgPSBtaWdyYXRlQ29uZmlnT3B0aW9uc1xuIl19