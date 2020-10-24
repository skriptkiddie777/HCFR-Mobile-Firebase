CoreControls.setWorkerPath('./lib/core');

const flipbookElement = document.getElementById('flipbook');
const loadingMessageElement = document.getElementById('loading-message');

loadingMessageElement.innerHTML = 'Preparing document...';

const source = 'https://firebasestorage.googleapis.com/v0/b/hcfr-pocket-guide-app.appspot.com/o/Medical-Documents%2Fmedical-protocol-all.pdf?alt=media&token=8bd22f79-bc4f-4bd7-8766-26a6f9587887';
const options = { l: window.sampleL /* license key here */ };

const documentPromise = CoreControls.createDocument(source, options);

documentPromise.then(doc => {
  const info = doc.getPageInfo(1);
  const width = info.width;
  const height = info.height;
  const pageCount = doc.getPageCount();
  const promises = [];
  const canvases = [];

  const boundingRect = flipbookElement.getBoundingClientRect();
  let flipbookHeight = boundingRect.height;
  let flipbookWidth = boundingRect.width;
  if (((flipbookHeight * width) / height) * 2 < flipbookWidth) {
    flipbookWidth = ((flipbookHeight * width) / height) * 2;
  } else {
    flipbookHeight = ((flipbookWidth / width) * height) / 2;
  }

  for (let i = 0; i < pageCount; i++) {
    promises.push(
      /* eslint-disable-next-line no-loop-func */
      new Promise(resolve => {
        // Load page canvas
        const pageNumber = i + 1;
        return doc.requirePage(pageNumber).then(() => {
          return doc.loadCanvasAsync({
            pageNumber,
            drawComplete: (canvas, index) => {
              canvases.push({ index, canvas });

              loadingMessageElement.innerHTML = `Loading page canvas... (${canvases.length}/${pageCount})`;
              resolve();
            },
            isInternalRender: true,
          });
        });
      })
    );
  }

  Promise.all(promises).then(() => {
    flipbookElement.removeChild(loadingMessageElement);
    flipbookElement.style.margin = '60px 0px 0px auto';

    canvases.sort((a, b) => a.index - b.index).forEach(o => flipbookElement.appendChild(o.canvas));

    $('#flipbook').turn({
      width: flipbookWidth,
      height: flipbookHeight,
    });

    setTimeout(() => {
      $('#flipbook').turn('next');
    }, 500);

    document.getElementById('previous').onclick = () => {
      $('#flipbook').turn('previous');
    };

    document.getElementById('next').onclick = () => {
      $('#flipbook').turn('next');
    };
  });
});