/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const Container = CompLibrary.Container;

const CWD = process.cwd();

const versions = require(`${ CWD }/versions.json`);
const releaseNotes = {
  "0.8": {
    "ios": "https://github.com/kinecosystem/kin-ecosystem-ios-sdk/releases/tag/0.8.0",
    "android": "https://github.com/kinecosystem/kin-ecosystem-android-sdk/releases/tag/0.8.0"
  },
  "0.7": {
    "ios": "https://github.com/kinecosystem/kin-ecosystem-ios-sdk/releases/tag/0.6.4",
    "android": "https://github.com/kinecosystem/kin-ecosystem-android-sdk/releases/tag/0.4.0"
  }
};

function getReleaseNotesLinks(version) {
  const links = releaseNotes[version];

  if (!links) {
    return "none";
  }

  let html = [];
  if (links["android"]) {
    html.push(<a target="_blank" href={ links["android"] }>android</a>);
  }

  if (links["ios"]) {
    if (html.length > 0) {
      html.push(<span> | </span>);
    }

    html.push(<a target="_blank" href={ links["ios"] }>ios</a>);
  }

  return html;
}

function Versions(props) {
  const {config: siteConfig} = props;
  const latestVersion = versions[0];
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${
    siteConfig.projectName
  }`;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h1>{siteConfig.title} Versions</h1>
          </header>
          <p>New versions of this project are released every so often.</p>
          <h3 id="latest">Current version (Stable)</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>{latestVersion}</th>
                <td>
                  <a href="/docs/api_readme.html">Documentation</a>
                </td>
                <td>
                  Release Notes: { getReleaseNotesLinks(latestVersion) }
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="rc">Pre-release versions</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>dev/master</th>
                <td>
                  <a href="/docs/next/api_readme.html">Documentation</a>
                </td>
                <td>
                  <span>Source Code: </span>
                  <a target="_blank" href="https://github.com/kinecosystem/kin-ecosystem-android-sdk">android</a>
                  <span> | </span>
                  <a target="_blank" href="https://github.com/kinecosystem/kin-ecosystem-ios-sdk">ios</a>
                </td>
              </tr>
            </tbody>
          </table>
          <p>Other text describing this section.</p>
          <h3 id="archive">Past Versions</h3>
          <table className="versions">
            <tbody>
              {versions.map(
                version =>
                  version !== latestVersion && (
                    <tr>
                      <th>{version}</th>
                      <td>
                        <a href={`/docs/${ version }/api_readme.html`}>Documentation</a>
                      </td>
                      <td>
                        Release Notes: { getReleaseNotesLinks(version) }
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
          <p>
            You can find past versions of this project on{' '}
            <a href={repoUrl}>GitHub</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}

module.exports = Versions;
