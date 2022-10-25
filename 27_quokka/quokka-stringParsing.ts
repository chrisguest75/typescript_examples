function test_url(url) {
    const urlSplit = url.split('://')[1].split(':')
    
    return urlSplit    
}

function test_fileIndices(fileName) {
    //const fileName = 'file0000.wav.m4a'
    console.log(fileName.split('.')[0])
    const extracted = fileName.split('.')[0].match(/\d/g) as [];
    return parseInt(extracted.join(''), 10)
}

function test_fileIndicesStrict(filePath) {
    const s = filePath.split('/');
    console.log(s)

    const fileName = s.pop() as string;
    console.log(fileName)
    const fileNameNoExt = fileName.split('.')[0];
    console.log(fileNameNoExt)

    let regexp = /^\d{10}$/;
    if(regexp.test(fileNameNoExt)) {
        console.log(fileNameNoExt)
    } else {
        throw Error('Malformed filename')
    }

    return fileNameNoExt
}

console.log(test_url('ws://machine1:9000'))
console.log(test_fileIndices('file0000'))
console.log(test_fileIndices('file0001'))
console.log(test_fileIndicesStrict('mypath/folder/0000000000.dat'))
console.log(test_fileIndicesStrict('mypath/folder/0003434000.dat'))
console.log(test_fileIndicesStrict('mypath/folder/0003434000'))

//console.log(test_fileIndicesStrict('mypath/folder/000000000.dat'))
//console.log(test_fileIndicesStrict('mypath/folder/00000000000.dat'))
console.log(test_fileIndicesStrict('mypath/folder/000000000001.dat'))
