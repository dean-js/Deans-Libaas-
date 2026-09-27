class NewsletterPopup extends HTMLElement {
  constructor() {
    super();
    this.storageKey = this.dataset.storageKey || 'newsletter-popup-dismissed';
    this.overlay = this.querySelector('.newsletter-popup__overlay');
    this.closeButton = this.querySelector('.newsletter-popup__close');
    this.successMessage = this.querySelector('.newsletter-form__message--success');
  }

  connectedCallback() {
    this.closeButton.addEventListener('click', this.dismiss.bind(this));
    this.overlay.addEventListener('click', this.dismiss.bind(this));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.hasAttribute('open')) this.dismiss();
    });

    if (this.successMessage) {
      this.open();
      window.localStorage.setItem(this.storageKey, 'true');
      return;
    }

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(this.storageKey) === 'true';
    } catch (error) {
      dismissed = false;
    }

    if (!dismissed) {
      this.timeout = setTimeout(this.open.bind(this), 2500);
    }
  }

  open() {
    this.setAttribute('open', '');
    document.body.classList.add('overflow-hidden');
  }

  dismiss() {
    this.removeAttribute('open');
    document.body.classList.remove('overflow-hidden');
    try {
      window.localStorage.setItem(this.storageKey, 'true');
    } catch (error) {
      // localStorage unavailable; popup will simply reappear next visit
    }
    if (this.timeout) clearTimeout(this.timeout);
  }
}

customElements.define('newsletter-popup', NewsletterPopup);
