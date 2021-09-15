import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('@nxsmart-truffle e2e', () => {
  it('should create @nxsmart-truffle', async () => {
    const plugin = uniq('@nxsmart-truffle');
    ensureNxProject(
      '@my-org/@nxsmart/truffle',
      'dist/packages/@nxsmart/truffle'
    );
    await runNxCommandAsync(
      `generate @my-org/@nxsmart/truffle:@nxsmart-truffle ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('@nxsmart-truffle');
      ensureNxProject(
        '@my-org/@nxsmart/truffle',
        'dist/packages/@nxsmart/truffle'
      );
      await runNxCommandAsync(
        `generate @my-org/@nxsmart/truffle:@nxsmart-truffle ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('@nxsmart-truffle');
      ensureNxProject(
        '@my-org/@nxsmart/truffle',
        'dist/packages/@nxsmart/truffle'
      );
      await runNxCommandAsync(
        `generate @my-org/@nxsmart/truffle:@nxsmart-truffle ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
