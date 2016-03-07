var dts = require('dts-bundle');

dts.bundle({
    name: 'wakanda-client',
    main: 'dist/tsBuild/wakanda-client.d.ts',
    verbose: true,
    external: true,
    out: '../wakanda-client.d.ts',
    emitOnIncludedFileNotFound: true,
    emitOnNoIncludedFileNotFound: true
});
