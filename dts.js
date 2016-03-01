var dts = require('dts-bundle');

dts.bundle({
    name: 'wakjsc',
    main: 'dist/tsBuild/wakanda-client.d.ts',
    verbose: true,
    external: true,
    out: 'wakanda-client.bundle.d.ts',
    emitOnIncludedFileNotFound: true,
    emitOnNoIncludedFileNotFound: true
});
